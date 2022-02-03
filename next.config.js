/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:slug*',
  //       destination: 'https://content-yoda.smartlife.vodafo.ne/api/:slug*',
  //       // headers: {'Cookie': 'SESSION=NTUxZDgyMTgtZDMzMy00ZWE4LTk3MmQtNzgwZGVmNzA0ZTI0'}
  //     },
  //   ]
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/api',
  //       headers: [
  //         {
  //           key: 'Cookie',
  //           value: 'SESSION=Y2JlZWE4Y2EtZDIzNi00ZmIwLWEzY2EtZTU0ZjczYTU3OTlh',
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
