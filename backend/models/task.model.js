const mongoose  = require('mongoose');
const {isNil, omitBy}  = require('lodash');

const TaskSchema = new mongoose.Schema({
    task : {
        type : String,
        required : true,
        trim : true,
    },
    priority : {
        type : Number,
        enum : [1,2,3],
        trim : true,
        default : 1
    },
    status : {
        type : String,
        trim : true,
        enum : ['To Do','In Progress','Completed'],
        default : 'To Do'
    }
},{
    timestamps : true
});

TaskSchema.method({
    transform(){
        const transformed = {};
        const fields = ['id', 'task','priority','status','createdAt'];

        fields.forEach((field) => {
        transformed[field] = this[field];
        });

        return transformed;
    }
});


TaskSchema.statics = {
    // async list({page = 1, perPage = 25, priority, status, search}){
    async list({page = 1, perPage = 25, priority, status, search}){
    // const options = omitBy({task, priority, status}, isNil);
    console.log(search)
    var options = {};
    if(search){
        options = {task : { $regex: '/'+search+'/i' }}
    }

    console.log(options)

    // const query = [ 
    //   { $match: options }
    // ]
  
    // query.push(
    //   { $facet: {
    //     metadata: [
    //       { $group: { 
    //         _id: null,
    //         total: { $sum: 1 }
    //       }},
    //     ],
    //     data: [ 
    //       { $sort: {createdAt: -1 } },
    //       { $skip: perPage * (page - 1) },
    //       { $limit: perPage },
    //     ]
    //   }
    //   },
    //   { $project: { 
    //       data: 1,
    //       // Get total from the first element of the metadata array 
    //       total: { $arrayElemAt: [ '$metadata.total', 0 ] }
    //     }
    //   }
    // )
  
    // return this
    //   .aggregate(query)
    //   .then(([{ total, data }]) => {
    //       return {
    //           page ,
    //           perPage,
    //           total,
    //           data,
    //       }
    //   })
    // } 

    return this.find({task : { '$regex' : new RegExp(search,'i') }})
                .sort({'createdAt' : -1})
                .skip(perPage * (page - 1))
                .limit(perPage)
                .exec()
    }
}


module.exports = mongoose.model('Task', TaskSchema, 'tasks');