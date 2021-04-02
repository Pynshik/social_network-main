import { createTweetValidationSchema, validateTweet } from '../../validations/createTweet';

describe('createTweet validation', () => {
    it('should return error caused by "text is required"', async () => {
        let error = null;
        const request = {};

        try {
            await createTweetValidationSchema.validate(request);
            
        } catch (e) {
            error = e;
        }

        expect(error.errors[0]).toBe('Текст является обязательным полем');
        
    });

    it('should return error caused by "length of text must be < 280 symbols"', async () => {
        let error = null;
        const request = {
            body: {
                'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mass',
                'images': []
            }
        };

        try {
            const response = await createTweetValidationSchema.validate(request.body);
        } catch (e) {
            error = e;
        }

        expect(error.errors[0]).toBe('Максимальная длина твита 280 символов');
    });

})