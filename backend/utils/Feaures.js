export class Features {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    };

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options : "i"
        }
        } : {};
        this.query = this.query.find({...keyword});
        return this;    
    };

    filtered(){
        const queryCopy = {...this.queryStr}

        const removeKeys = ["keyword","page","limit"]
        removeKeys.forEach(key=> delete queryCopy[key])

        //For Price Filtering
        let queryString = JSON.stringify(queryCopy)
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryString))
        return this;
    };

    pagination(){
        const currentPage = Number(this.queryStr.page) || 1
        const limit = Number(this.queryStr.limit) || 8
        const skip = limit * (currentPage - 1)

        this.query = this.query.limit(limit).skip(skip)

        return this;
    }

}