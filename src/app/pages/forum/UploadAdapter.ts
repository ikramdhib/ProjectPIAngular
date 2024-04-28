import { HttpClient } from '@angular/common/http';

export class MyUploadAdapter {
    constructor(private loader: any, private http: HttpClient) {}

    upload() {
        return this.loader.file.then(file => {
            const formData = new FormData();
            formData.append('image', file);

            return this.http.post<{url: string}>('http://localhost:8081/images', formData).toPromise().then(
                (response) => {
                    console.log(response); 
                    return { default: response.url }; 
                    
                },
                (error) => {
                    throw error.message; 
                }
            );
        });
    }
}