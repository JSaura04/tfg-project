export const OverlayMessage = ({ message }: { message: string }) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
    {message}
  </div>
);
