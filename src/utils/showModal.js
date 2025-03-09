import showNotify from "../utils/showNotify";
import { Constants } from "../constants";

const openModal = async (client, modal_type, title, template, data) => {
  try {
    await client.interface.trigger(modal_type, {
      title: title,
      template: template,
      data: data,
    });
  } catch (error) {
    await showNotify(
      client,
      Constants.NOTIFICATION_TYPES.DANGER,
      Constants.NOTIFICATION_MESSAGES.WENT_WRONG_ERROR
    );
  }
};

export default openModal;