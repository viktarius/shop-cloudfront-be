class LoggerService {
    log(message: string = '', data?: any) {
        console.log('LOG: ', message, data)
    }

    logError(message: string = '', data?: any) {
        console.error('ERROR: ', message, data)
    }
}

export const loggerService = new LoggerService();
