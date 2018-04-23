import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Home} from './Home';
import Layout from './HomeLayout';
import Movie from '../../components/Movie/Movie';
import Loader from '../../components/Loader/Loader';

configure({adapter: new Adapter()});


describe('<Home />', () => {
    let wrapper;
    let props = {
        searchString: 'foo',
        checkForFavorites: false,
        getPopularMovies: jest.fn(),
        getFilteredMovies: jest.fn(),
    }
    beforeEach(() => {
        wrapper = shallow(<Home {...props} />);
    })
    it('"getPopularMovies" should be called if "checkForFavorites" is "true" and "searchString" is  ""', () => {
        wrapper.setProps({ searchString: '', checkForFavorites: true})
        expect(wrapper.props().getPopularMovies).toHaveBeenCalled();
    })

    it('"getFilteredMovies" should be called if "checkForFavorites" is "true" and "searchString" is not ""', () => {
        wrapper.setProps({ searchString: 'foo', checkForFavorites: true})
        expect(wrapper.props().getFilteredMovies).toHaveBeenCalled();
    })
})