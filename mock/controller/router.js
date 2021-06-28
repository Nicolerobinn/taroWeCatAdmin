const data = []
module.exports = [
  {
    url: '/menu/navigate',
    type: 'post',
    response() {
      return { code: 200, msg: 'success', data: data }
    },
  },
]
