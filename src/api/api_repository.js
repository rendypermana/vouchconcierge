import frontend_request from '@/api/frontend_request.js'

const repositories = {
    frontend_request: frontend_request,
};


export const RepositoryAPI = {
    get : name => repositories[name]
};