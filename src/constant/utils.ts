export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      // Extender el tipo de Error con la posible propiedad `response`.
      type ErrorWithResponse = Error & { response?: { status?: number } };
      const status = (error as ErrorWithResponse).response?.status;
  
      // Mensajes personalizados para cada código HTTP.
      const messages: Record<number, string> = {
        400: "Solicitud incorrecta: El servidor no entendió la petición.",
        403: "Prohibido: No tienes permiso para realizar esta acción.",
        404: "No encontrado: El recurso solicitado no existe.",
        409: "Conflicto de integridad referencial.",
        500: "Error en el servidor: No puedes realizar esta acción debido a la integridad de la información.",
      };
  
      // Devolver mensaje si el estado está definido en los mensajes.
      if (status && messages[status]) {
        return messages[status];
      }
  
      // Si el estado no está en la lista, devolver el mensaje del error.
      return error.message;
    }
  
    // Mensaje genérico para errores desconocidos.
    return "Ocurrió un error desconocido.";
  };
  