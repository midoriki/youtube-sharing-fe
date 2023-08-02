
import { faker } from '@faker-js/faker';
import { useProfileStore } from './ProfileStore';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProfileStore', () => {
  it('should constructed and works properly', async () => {
    const userTest = userEvent.setup();
    const fakeUser = { id: faker.string.uuid(), email: faker.internet.email() };
    const Component = () => {
      const user = useProfileStore((state) => state.user);
      const setUser = useProfileStore((state) => state.setUser);

      return (
        <div>
          <div data-testid="email">{user?.email}</div>
          <button data-testid="button" onClick={() => setUser(fakeUser)}>Submit</button>
        </div>
      );
    };

    render(<Component />);
    expect(screen.getByTestId('email').textContent).toBe('');
    await act(() => userTest.click(screen.getByTestId('button')));
    expect(screen.getByTestId('email').textContent).toBe(fakeUser.email);
  });
});