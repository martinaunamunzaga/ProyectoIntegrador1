module.exports=(sequelize, DataTypes) => {
    let alias= "Comentario"
    let cols= {
            id: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            comentario:{
                type: DataTypes.STRING
            },
            
            createdAt:{
                type: DataTypes.DATE
            },
            updatedAt:{
                type: DataTypes.DATE
            },
            usuario_id:{
                type: DataTypes.INTEGER
            },
            posteo_id:{
                type: DataTypes.INTEGER
            },
        }
    let config= {
        tableName:"comentarios",
    }
    const Comentario=sequelize.define(alias, cols, config)
    Comentario.associate=(model)=>{
        Comentario.belongsTo(model.Usuario,{
            as:'usuario',
            foreignKey: 'usuario_id'
        })                                                 
        Comentario.belongsTo(model.Posteo, {
            as: 'posteo',      
            foreignKey: 'posteo_id'
        })
    }
    return Comentario
}