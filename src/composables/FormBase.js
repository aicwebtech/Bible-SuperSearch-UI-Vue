import { ref } from 'vue';
import { axios } from 'axios';
import { useConfigStore } from '@/stores/config.js';

export function useFormBase() {
    const formData = ref({});
    const formErrors = ref({});
    const isSubmitting = ref(false);
    const configStore = useConfigStore();
    const apiUrl = configStore.get('apiUrl');

    function reset() {
        formData.value = {};
        formErrors.value = {};
        isSubmitting.value = false;
    }

    function submit() {
        isSubmitting.value = true;
        // Simulate form submission
        setTimeout(() => {
            isSubmitting.value = false;
            // Handle success or error response here
        }, 2000);

        // Get Request
        axios.get(`${apiUrl}/api/v2`, { params: formData.value })
            .then((response) => {
                // Handle success response
                console.log('Form submitted successfully:', response.data);
            }  
            .catch((error) => {
                // Handle error response
                console.error('Error submitting form:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                    formErrors.value = error.response.data.errors;
                }
            });
        
        // Post Request - make an option
        // axios.post(`${apiUrl}/api/v2`, { params: formData.value })

        //     .then((response) => {
        //         // Handle success response
        //         console.log('Form submitted successfully:', response.data);
        //     }
        //     .catch((error) => {
        //         // Handle error response
        //         console.error('Error submitting form:', error);
        //         if (error.response && error.response.data && error.response.data.errors) {
        //             formErrors.value = error.response.data.errors;
        //         }
        //     });
    }

    return {
        formData,
        formErrors,
        isSubmitting,
        reset,
        submit,
    };
}
