

export const GetDate = (date: any) => {
  if (!date || typeof(date) != "string" || date == undefined) {
    return null;
  }
  const dateObject = new Date(date);

  // Extract the date (in YYYY-MM-DD format)
  const dateOnly = dateObject.toLocaleDateString("en-GB"); // Example: '12/08/2024'

  return dateOnly;
};

export const GetTime = (date: string | undefined) => {
  if (!date) {
    return null;
  }
  const dateObject = new Date(date);

  // Extract the time (in HH:MM format)
  const timeOnly = dateObject.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeOnly;
};

export const GetEveningStatus = (status: any) => {
  let publicStatus;

  switch (status) {
    case "A":
      publicStatus = "Started";

      break;
    case "B":
      publicStatus = "Published";

      break;
    case "C":
      publicStatus = "Ongoing";

      break;
    case "D":
      publicStatus = "Completed";

      break;
    case "E":
      publicStatus = "Closed";

      break;
    default:
      "";
      break;
  }

  return publicStatus;
};

export const MakeDate = (date: string) => {
  if (!date) {
    return null;
  }
  const dateObject = new Date(date);

  // Extract the date (in YYYY-MM-DD format)
  const dateOnly = dateObject.toLocaleDateString("en-GB");

  return dateOnly;
};


// ! can be exported to other pages for logout functionality 
export const handleLogOut = async (route:any) => {
  const response = await fetch("/api/auth/logout/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(loginData),
  });

  if (response.ok) {
    localStorage.clear();
    route.push("/login");
  }
};