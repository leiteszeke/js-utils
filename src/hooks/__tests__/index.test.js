import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useParams } from '../index';
import { createMemoryHistory } from 'history';
import { Router, Route, withRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';

const TestComponent = withRouter(({ history }) => {
  const { result } = renderHook(() =>
    useParams(history, '/account/:accountId/user/:userId'),
  );

  const { accountId, userId } = result.current;

  return (
    <>
      <div data-testid="accountId">{accountId}</div>
      <div data-testid="userId">{userId}</div>
    </>
  );
});

test('should get correct accountId and userId', () => {
  const history = createMemoryHistory();
  history.push('/account/12/user/30');

  const { getByTestId } = render(
    <Router history={history}>
      <Route
        path="/account/:accountId/user/:userId"
        component={TestComponent}
      />
    </Router>,
  );

  expect(getByTestId('accountId')).toHaveTextContent(12);
  expect(getByTestId('userId')).toHaveTextContent(30);
});
