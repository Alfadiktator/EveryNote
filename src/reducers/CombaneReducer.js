import {combineReducers} from 'redux'

import tags from './TagsReducer'
import user from './UserReducer'
import notes from './NotesReducer'
import folders from './FoldersReducer'

export default combineReducers({
    tags,
    user,
    notes,
    folders,
});