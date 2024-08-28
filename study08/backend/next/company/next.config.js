// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3500/:path*' // 백엔드로 프록시
        }
      ]
    }
}