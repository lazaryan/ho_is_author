import path from 'path'

import { Action } from 'routes';

export const handleErrorNotFound = ({ req, res }: Action) => {
  res.status(404).sendFile(path.resolve(`../build/static/pages/404/index.html`))
}

export const handleErrorInternal = ({ req, res }: Action) => {
  res.status(500).sendFile(path.resolve(`../build/static/pages/500/index.html`))
}
