module.exports=(sequelize, DataTypes) => {
    let alias= "Posteo"
    let cols= {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        imagen:{
            type: DataTypes.STRING
        },
        descripcion:{
            type: DataTypes.STRING
        },
       
        created_at:{
            type: DataTypes.DATE,
            
        },
        updated_at:{
            type: DataTypes.DATE,
            
        },
        usuario_id:{
            type: DataTypes.INTEGER
        },
        
    }
    let config= {
        tableName:"posteos",
        underscored: true
    }
    const Posteo=sequelize.define(alias, cols, config)
    Posteo.associate=(model)=>{
        Posteo.belongsTo(model.Usuario,{
            as:'usuario',
            foreignKey: 'usuario_id'
        })                                     // relaciones entre posteo y usuario y posteo y comentario
        Posteo.hasMany(model.Comentario, {
            as: 'comentarios',      
            foreignKey: 'posteo_id'
        })
    }
    return Posteo
}