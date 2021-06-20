import { Action } from 'routes';
import moment from 'moment'
import pick from 'lodash/pick'
import { v4 as uuidV4 } from 'uuid';
import { User } from 'types/interface';

import HistoryBD from '../../models/history';

import 'moment/locale/ru';
moment.locale('ru');

export const createHistory = ({ req, res }: Action) => {
  //@ts-ignore
  const user: User = req.session.user;

  const data = req.body

  const history: { [key: string]: any } = new HistoryBD();

  history.cards = JSON.stringify(data.cards || {});
  history.created = moment().format('DD MMMM YYYY')
  history.entity_id = uuidV4()
  history.author_id = user.entity_id
  history.author_name = user.name || user.email || 'безымянный';
  history.name = data.name
  history.description = data.description
  history.authors = data.authors
  history.keywords = data.keywords

  //@ts-ignore
  history.save(err => {
    if(err) {
      return res.send({
        meta: {
          status: 'ERROR',
          message: err
        }
      })
    }

    return res.send({
      meta: {
        status: 'OK'
      }
    })
  })
}

export const getHistories = ({ req, res }: Action) => {
  HistoryBD.find({}, (err, histories) => {
    res.send({
      data: histories.map(history => pick(history, ['name', 'description', 'keywords', 'autors', 'created', 'entity_id'])),
      meta: {
        status: err ? 'ERROR' : 'OK',
        message: err
      }
    })
  })
}

export const getHistory = ({ req, res }: Action) => {
  if (!req.query.id) {
    res.send({
      data: null,
      meta: {
        status: 'OK'
      }
    })
    return;
  }

  HistoryBD.findOne({ entity_id: req.query.id }, null)
    .then(history => {
      res.send({
        data: history,
        meta: {
          status: 'OK'
        }
      })
    })
    .catch(error => {
      res.send({
        data: null,
        meta: {
          status: 'ERROR',
          message: error
        }
      })
    })
}
