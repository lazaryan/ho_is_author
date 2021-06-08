import { FC, useState, useEffect, useCallback } from 'react';
import { Segment, Accordion, Menu, Grid, Input, TextArea, Button, Header } from 'semantic-ui-react';
import { IoMdClose } from 'react-icons/io';
import get from 'lodash/get';
import omit from 'lodash/omit';
import lodashUpdate from 'lodash/update';
import { Group } from '@visx/group';
import { LinkHorizontal } from '@visx/shape';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Icon from 'components/Icon';
import { IProps } from 'screens/CreateScreen';
import { ICard } from 'types/interfaces';

const defaultMargin = { top: 50, left: 50, right: 50, bottom: 50 };

interface TreeProps {
  width: number;
  height: number;
  margin?: {[key: string]: number};
  data: ICard;
  setActivePath: (newPath: string) => void;
  activePath: string;
  disabled: boolean;
}

const TreeCards: FC<TreeProps> = ({ width: totalWidth, height: totalHeight, margin = defaultMargin, data, setActivePath, activePath, disabled }) => {
  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let activeLevel = 0;
  let count = 1;

  return (totalWidth < 10 ? null : <div>
    <svg width={totalWidth} height={totalHeight}>
      <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
      <rect width={totalWidth} height={totalHeight} rx={14} fill="#f2f2f2" />
      <Group top={margin.top} left={margin.left}>
        <Tree
          //root={hierarchy(data, d => (d.children))}
          root={hierarchy(data, d => {
            if (d && d.children && d.children.length) {
              return !d.children[0] ? [] : d.children
            } else {
              return []
            }
          })}
          size={[innerHeight, innerWidth]}
          separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
        >
          {tree => <Group top={0} left={0}>
            {tree.links().map((link, i) => (
              <LinkHorizontal
                key={i}
                data={link}
                stroke="rgb(254,110,158,0.6)"
                strokeWidth="1"
                fill="none"
              />
            ))}
            {tree.descendants().map((node, key) => {
              const width = 50;
              const height = 30;

              const top = node.x;
              const left = node.y;

              if (activeLevel === node.depth) {
                count++;
              } else {
                activeLevel = node.depth;
                count = 1;
              }

              const title = node.depth === 0 ? '1' : `${node.depth + 1}.${count}`
              const isActive = node.data.path === activePath;

              return (<Group top={top} left={left} key={key}>
                <rect
                  height={height}
                  width={width}
                  y={-height / 2}
                  x={-width / 2}
                  fill={isActive ? '#f5f5f5' : '#d8d8d8'}
                  stroke={isActive ? '#a22' : node.data.children ? '#03c0dc' : '#26deb0'}
                  strokeWidth={1}
                  strokeDasharray={isActive || node.data.children ? '0' : '2,2'}
                  strokeOpacity={node.data.children ? 1 : 0.6}
                  rx={node.data.children ? 0 : 10}
                  style={{ cursor: !disabled ? 'pointer' : 'default' }}
                  onClick={() => {
                    !disabled && setActivePath(node.data.path || '')
                  }}
                />
                <text
                  dy=".33em"
                  fontSize={9}
                  fontFamily="Arial"
                  textAnchor="middle"
                  style={{ pointerEvents: 'none', cursor: !disabled ? 'pointer' : 'default' }}
                  fill={isActive || node.children ? '#222' : '#a22'}
                >
                  { title }
                </text>
              </Group>)
            })}
          </Group>}
        </Tree>
      </Group>
    </svg>
  </div>)
}

const History: FC<IProps> = ({ state, update }) => {
  const [graph, setGraph] = useState(state.cards || {})
  const [activePathCart, setActivePathCart] = useState('');
  const [showTree, setShowTree] = useState(false);
  const [activeCard, setActiveCard] = useState(graph);
  const [activeNewCard, setActiveNewCard] = useState(true);
  const [initialForm, setInitialForm] = useState(!state.cards || !Object.keys(state.cards))

  useEffect(() => {
    setActiveCard(activePathCart ? get(graph, activePathCart) : graph)
  }, [graph, activePathCart, setActiveNewCard])

  const handleUpdateCard = useCallback((field: string, value: string) => {
    setActiveCard(card => ({
      ...card,
      [field]: value
    }))
  }, [setActiveCard]);

  const createFirstCard = useCallback(() => {
    const newCard = {
      name: '',
      path: '',
      children: []
    }

    setGraph(newCard);
    setActiveCard(newCard);
    setInitialForm(false);
    setActiveNewCard(true);
    setShowTree(true);
  }, [setGraph, setActiveCard, setInitialForm, setActiveNewCard, setShowTree]);

  const saveCard = useCallback(() => {
    const newCard = activePathCart ? lodashUpdate(graph, activePathCart, () => activeCard) : { ...graph, ...activeCard };

    update('cards', newCard);
    setGraph(newCard);
    setActiveNewCard(false)
  }, [graph, activeCard, update, setActiveNewCard, setGraph, activePathCart]);

  const addNewCard = useCallback(() => {
    let newPath;
    let savingData;
    let newCard;

    if (activePathCart) {
      savingData = lodashUpdate(graph, activePathCart, item => {
        newPath = `${item.path}.children[${item.children ? item.children.length : 0}]`;
        newCard = { name: '', path: newPath, children: [] }
  
        return {
          ...item,
          children: [
            ...(item.children || []),
            newCard
          ]
        }
      })
    } else {
      newPath = `children[${graph.children ? graph.children.length : 0}]`;
      newCard = { name: '', path: newPath, children: [] }

      savingData = {
        ...graph,
        children: [
          ...(graph.children || []),
          newCard
        ]
      }
    }

    setGraph(savingData)
    setActiveCard(newCard as ICard)
    setActiveNewCard(true)
    setActivePathCart(newPath as string)
  }, [graph, activePathCart, setActivePathCart, setActiveNewCard, setGraph, setActiveCard])

  const removeCart = useCallback(() => {
    setInitialForm(true)

    console.log(111, activeCard.path, state.cards, get(state.cards, activeCard.path || ''))

    if (!activeCard.path) {
      update('cards', {})
      setActiveCard({})
    } else {
      if (state.cards && get(state.cards, activeCard.path)) {
        const newState = omit(state.cards, activeCard.path)

        //
        //const newState = set(state.cards, activeCard.path, undefined)
        update('cards', { ...newState })
      }

      setGraph(graph => {
        const newState = omit(graph, activeCard.path || '')

        console.log(999, graph, activeCard.path, omit(graph, activeCard.path || ''))

        return { ...newState }
      })

      setActiveCard({})
    }
  }, [activeCard, state.cards, update, setInitialForm, setActiveCard])
  
  return (<Segment className="history-segment">
    <Grid>
      <Grid.Column width="8">
        <Accordion as={Menu} vertical style={{ width: '100%' }}>
          <Menu.Item disabled={!initialForm}>
            <Accordion.Title
              active={showTree}
              content="Показать карту истории"
              index={0}
              onClick={() => !initialForm && setShowTree(show => !show)}
            />
            <Accordion.Content
              active={showTree}
              content={<ParentSize>{({ width, height }) => <TreeCards
                width={width}
                height={600}
                margin={defaultMargin}
                data={graph}
                setActivePath={setActivePathCart}
                activePath={activePathCart}
                disabled={activeNewCard}
              />
              }</ParentSize>}
            />
          </Menu.Item>
        </Accordion>
      </Grid.Column>
      <Grid.Column width="8">
        {(initialForm || !Object.keys(activeCard)) ? <Segment placeholder className="empty-card" onClick={createFirstCard}>
          <Header textAlign="center">Создать первую карточку</Header>
        </Segment> : <Segment raised className="history-card">
          <div className="inline-field">
            <Input
              fluid
              placeholder="Введите название..."
              value={activeCard.name}
              onChange={(event, { value }) => handleUpdateCard('name', value)}
            />
            <Icon color="red" size="30px" onClick={removeCart}><IoMdClose /></Icon>
          </div>
          <TextArea
            placeholder="Введите описание..."
            value={activeCard.description || ''}
            onChange={(event, { value }) => handleUpdateCard('description', value as string)}
          />
          <div className="actions">
            <Button primary disabled={!activeCard.name} onClick={saveCard}>Сохранить</Button>
            <Button disabled={activeNewCard} onClick={addNewCard}>+ Добавить ответвление</Button>
          </div>
        </Segment>}
      </Grid.Column>
    </Grid>
  </Segment>)
}

export default History;
