import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { mswServer } from './mswServer';

configure({ adapter: new Adapter() });

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
