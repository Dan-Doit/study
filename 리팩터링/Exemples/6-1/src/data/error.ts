const errors = {
    notFound : {
        code : '404',
        status : 'NOT_FOUND'
    }
}

export const NotFoundException = (type:string, id:number) => (
    {
        code : errors.notFound.code,
        status : errors.notFound.status,
        message : `NOT FOUND ${type} BY ID ${id}`
    }
)