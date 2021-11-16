import http from '@/http';
import logger from '@/http/logger';
import { Demo } from './home.model';


export const test = http.GET<Demo>(
	'http://10.11.36.51:3166/api/pd/game-front/open/wms/page/games?isRecommend=1&pageNumber=1&pageSize=999&country=GLO',
	{
		headers: {
			'PRODUCT-ID': 'HX1',
			'X-website-code': 'HX1_PC',
		},
		cache: true,
	},
);

http.POST('adsd');
