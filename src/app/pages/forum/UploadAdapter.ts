export class MyUploadAdapter {
    loader: any;
    xhr: any;
    
    constructor( loader ) {
        this.loader = loader;
    }
    upload() {
        const xhr = this.xhr = new XMLHttpRequest();
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initListeners( resolve, reject, file );  
            } ) );
    }
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }
    
    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;
        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
            resolve( {
                default: response.url
            } );
        } );
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }
    
}
