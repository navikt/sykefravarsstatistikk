import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import './src/mocking/mock';

configure({ adapter: new Adapter() });