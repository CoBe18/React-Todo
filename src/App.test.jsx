// @vitest-environment jsdom
import React from 'react';
import {test,expect} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
test('tasks survive remount, reject blank entries, and clear completed tasks',async()=>{
 localStorage.clear();
 const user=userEvent.setup();
 const view=render(<App/>);
 const initial=screen.getAllByRole('button',{pressed:false}).length;
 await user.click(screen.getByRole('button',{name:'Add a ToDo'}));
 expect(screen.getAllByRole('button',{pressed:false}).length).toBe(initial);
 await user.type(screen.getByRole('textbox',{name:'New task'}),'Portfolio test{Enter}');
 expect(screen.getByRole('button',{name:'Portfolio test'})).toBeTruthy();
 view.unmount();render(<App/>);
 await user.click(screen.getByRole('button',{name:'Portfolio test'}));
 expect(screen.getByRole('button',{name:'Portfolio test'}).getAttribute('aria-pressed')).toBe('true');
 await user.click(screen.getByRole('button',{name:'Clear Completed Tasks'}));
 expect(screen.queryByText('Portfolio test')).toBeNull();
 cleanup();render(<App/>);expect(screen.queryByText('Portfolio test')).toBeNull();cleanup();
});
test('corrupt saved data does not crash the app',()=>{
 localStorage.setItem('everyday-todos','not json');render(<App/>);expect(screen.getByRole('textbox',{name:'New task'})).toBeTruthy();cleanup();
});
