import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {AxiosError} from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
    catch(ax: AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        if (ax.code === 'ECONNABORTED' || ax.message?.includes('timeout')) {
            return res.status(504).json({statusCode: 504, message: 'Gateway Timeout', error: 'Gateway Timeout'});
        }
        if (ax.code === 'ECONNREFUSED' || ax.code === 'ENOTFOUND') {
            return res.status(502).json({statusCode: 502, message: 'Bad Gateway', error: 'Bad Gateway'});
        }

        const status = ax.response?.status ?? 502;
        const payload = ax.response?.data ?? {statusCode: status, message: 'Upstream error', error: 'Bad Gateway'};
        return res.status(status).json(payload);
    }
}
