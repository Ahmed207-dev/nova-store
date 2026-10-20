"use client";

const Button = ({ id }: { id?: string }) => {
  const HandleClick = async () => {
    try {
      const userRaw =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!userRaw || !token) {
        alert("log in first");
        return;
      }

      const userdata = JSON.parse(userRaw);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts?populate=*`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              users_permissions_user: userdata.documentId,
              proudct: id,
              quantity: 10,
            },
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Failed To Send Data: ${res.status}`);
      }
      if (res.status === 201) {
        alert("Add Sucess");
      }
      const data = await res.json();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <button
      className="bg-indigo-600 rounded-lg px-3 py-1 text-sm font-medium cursor-pointer duration-300 hover:bg-indigo-500"
      onClick={HandleClick}
    >
      Add To Cart
    </button>
  );
};

export default Button;
