import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateSearchQueryAction } from '../../redux/reducer';
import { AppState } from '../../redux/state';
import './SearchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();

    const onChange = useCallback(
        (e?: React.ChangeEvent<HTMLInputElement>) => dispatch(createUpdateSearchQueryAction(e?.target.value)),
        [dispatch]
    );
    const searchQuery = useSelector<AppState, string | undefined>((state) => state.searchQuery);
    console.log(searchQuery);

    return (
        <div className='search-bar-container'>
            <div className="menu-button-placeholder" />
            <input
                type='text'
                placeholder='Start typing restaurant name'
                onChange={onChange}
                value={searchQuery}
                className='search-field'
            />
        </div>
    );
}

export default SearchBar;