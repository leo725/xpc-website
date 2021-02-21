import App from 'next/app'
import 'antd/dist/antd.css'
import '../public/style/pages/comm.scss'
import '../public/style/components/antd-custom.scss'
import "babel-polyfill"

import { message } from 'antd';

message.config({ top: 100, duration: 3, maxCount: 3, });

export default App
