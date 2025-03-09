const showNotify = async (client, type, message) => {
  try {
    await client?.interface.trigger("showNotify", {
      type: type,
      message: message,
    });
  } catch (error) {
    console.error("Error in showNotify:", error);
  }
};

export default showNotify;
