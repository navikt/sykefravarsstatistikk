import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import './src/mocking/mock';
import { mswServer } from './src/metrikker/msw-server';

configure({ adapter: new Adapter() });

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
