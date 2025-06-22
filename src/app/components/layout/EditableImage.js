import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {

  async function handelFileChange(e) {
        const files = e.target.files;

        if (files && files.length > 0) {
            const data = new FormData();
            data.set('file', files[0]);
            toast.loading('Uploading...');
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            toast.dismiss();
            if (response.ok) {
                const link = await response.json();
                setLink(link);
                toast.success('Uploading Image successfully!');
            } else {
                toast.error('Failed to upload image.');
                setIsUploading(false);
            }
        }
    }


  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handelFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}