import {$crud} from '../utils/CrudFactory' 

export const retrieveData = async (url, params = {}) => {
        const {data} = await $crud.retrieve(url, params)
        return data
}