export default eventHandler(() => {
    console.log("This endpoint has been hit.")
    return { message: 'Hello from Nitro!' }
})