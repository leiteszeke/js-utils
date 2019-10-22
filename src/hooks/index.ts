// Dependencies
import { matchPath, withRouter } from 'react-router-dom';
// Interfaces
import { MyObject } from '../interfaces';

export const useParams = (history: MyObject, path: string): MyObject => {
  const { pathname } = history.location;
  const pattern = `(.*)?${path}`;
  const match = matchPath(pathname, { path: pattern }) || ({} as MyObject);
  return match.params;
};

export default {
  useParams,
};
