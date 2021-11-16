import { MockMethod } from 'vite-plugin-mock'


export const user:MockMethod[] = [
  {
    url:'/api/get',
    method:'get',
    statusCode:200,
    timeout:3000,
    // TODO: 库申明文件有问题 无法感知类型  返回json
    response({ query,body,headers,url }:{query:any,body:any,headers:any,url:any})  {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      }
    },
  },
  {
    url: '/api/text',
    method: 'post',
    // 返回非json
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
] 

export default user


