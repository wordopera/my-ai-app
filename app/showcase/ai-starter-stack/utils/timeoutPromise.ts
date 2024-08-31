// Filepath: app/showcase/ai-starter-stack/utils/timeoutPromise.ts
// Date: Aug 31
// Description: Utility function to add a timeout to any promise.
//This helps in enforcing the API_TIMEOUT for all external API calls

// Utility function to add a timeout to any promise
// This helps in enforcing the API_TIMEOUT for all external API calls
export async function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
    // Use Promise.race to resolve the promise or reject if the timeout is reached
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('API call timed out')), ms)
      )
    ]);
  }
  


// last line