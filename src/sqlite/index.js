const sqlite = require('sqlite3').verbose()

function getCommandName (sql) {
  const commandName = sql.trim().split(' ')[0]
  return `[${commandName}]`
}

class Sqlite {
  constructor () {
    this.db = null
  }

  // 连接数据库
  connect (filename = ':memory:') {
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(filename, (err) => {
        if (err === null) {
          console.log('Connect successfully!')
          resolve(err)
        } else {
          console.log('connect', err)
          reject(err)
        }
      })
    })
  }

  // 运行 SQL
  run (sql, param) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, param, (err) => {
        if (err === null) {
          console.log(getCommandName(sql), 'successfully!')
          resolve(err)
        } else {
          console.log('run', err)
          reject(err)
        }
      })
    })
  }

  // 批量运行 SQL
  exec (sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err === null) {
          console.log(getCommandName(sql), 'successfully!')
          resolve(err)
        } else {
          console.log('exec', err)
          reject(err)
        }
      })
    })
  }

  // 查询第一条数据
  get (sql, param) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, param, (err, data) => {
        if (err) {
          console.log('get', err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // 查询所有数据
  all (sql, param) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, param, (err, data) => {
        if (err) {
          console.log('all', err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // 关闭数据库
  close () {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err === null) {
          console.log('Close successfully!')
          resolve(err)
        } else {
          console.log('close', err)
          reject(err)
        }
      })
    })
  }

  // 获取实例
  static getInstance () {
    if (!this.instance) {
      this.instance = new Sqlite()
    }
    return this.instance
  }
}

export default Sqlite
