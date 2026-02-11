"use server";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function HandleAddNewCar(formData: NewCarType) {
  const { carImage } = formData;
  const isNoImage = carImage === "";
  const carImageName = carImage?.at(0)?.name;
  const carImageFile = carImage?.at(0);
  const uploadedImageName = `${Math.random()}-${carImageName}`.replaceAll(
    "/",
    ""
  );
  const supabase = await createClerkSupabaseClient();

  // change the newcar carImage property to the uploaded image URL to be provided to the image element src attribute in carCard component
  formData.carImage = isNoImage
    ? "https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images//DefaultCarImage.png"
    : `https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images/${uploadedImageName}`;
  formData.Maintenance = [
    {
      name: "Brake Pads",
      class: "Braking System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Brakes Master Cylinder",
      class: "Braking System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Brake Fluid",
      class: "Braking System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Brake Rotors",
      class: "Braking System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Brake Boosters",
      class: "Braking System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Shock Absorbers",
      class: "Suspension System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Coil Springs",
      class: "Suspension System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Ball Joints",
      class: "Suspension System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Bushings",
      class: "Suspension System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Transmission Fluid",
      class: "Transmission System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Clutch Bearing",
      class: "Transmission System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Pressure Plate",
      class: "Transmission System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Clutch Disc",
      class: "Transmission System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Axles",
      class: "Transmission System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Engine Oil",
      class: "Engine System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Engine Oil filter",
      class: "Engine System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Fuel filter",
      class: "Engine System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Spark Plugs",
      class: "Engine System",
      historyLog: [],
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Timing Belt",
      class: "Engine System",
      historyLog: [],
      changeEvery: 60000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Serpentine Belt",
      class: "Engine System",
      historyLog: [],
      changeEvery: 60000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Cabin Air Filter",
      class: "Air Conditioning System",
      historyLog: [],
      changeEvery: 60000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "Freon",
      class: "Air Conditioning System",
      historyLog: [],
      changeEvery: 60000,
      currentKilometrage: formData.currentKilometrage,
    },
    {
      name: "AC Compressor",
      class: "Air Conditioning System",
      historyLog: [],
      changeEvery: 60000,
      currentKilometrage: formData.currentKilometrage,
    },
  ];
  //Add the new car to the database
  const { data, error } = await supabase
    .from("cars")
    .insert([formData])
    .select();

  if (error) {
    console.error("Error adding car", error.message);
    return;
  } else {
    console.log("Car added successfully:");
  }

  //upload car image to supabase storage bucket
  if (!isNoImage) {
    const { error: imageStorageError } = await supabase.storage
      .from("car-images")
      .upload(`${uploadedImageName}`, carImageFile as File);
    if (imageStorageError) {
      console.error("Error uploading image:", imageStorageError.message);

      // delete the newly added car in case of image upload error

      const { error: deleteError } = await supabase
        .from("cars")
        .delete()
        .eq("carId", data.at(0).carId);
      if (deleteError)
        console.error(
          "error deleting the car after carImage upload failure",
          deleteError.message
        );
    } else {
      console.log("Car image uploaded successfully");
    }
  }
  revalidatePath("/cars");
  return data;
}

export async function deleteCar(carId: number, imageName: string) {
  const supabase = await createClerkSupabaseClient();
  const { error: deleteError } = await supabase
    .from("cars")
    .delete()
    .eq("carId", carId);
  if (imageName !== "DefaultCarImage.png") {
    await supabase.storage.from("car-images").remove([`${imageName}`]);
  }

  if (deleteError) console.error("error deleting the car", deleteError.message);
  revalidatePath("/cars");
}

export async function addNewMaintenance({
  newMaintenance,
  carId,
}: {
  newMaintenance: {
    name: string;
    date: string;
    brand: string;
    price: string;
    kilometrageBeforeMaintenance: number;
    kilometrageNextMaintenance: number;
  };
  carId: string;
}) {
  const supabase = await createClerkSupabaseClient();

  const { data: Maintenance } = await supabase
    .from("cars")
    .select("*")
    .eq("carId", carId)
    .select("Maintenance");
  const MaintenanceData: MaintenanceItem[] =
    Maintenance?.at(0)?.Maintenance ?? [];
  const filteredMaintenanceItem = MaintenanceData.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item) => item.name === newMaintenance.name
  ).at(0);
  // remove name property from newMaintenance object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...Maintenanceitem } = newMaintenance;
  filteredMaintenanceItem?.historyLog?.push(Maintenanceitem);
  const finalData = MaintenanceData.map((item: MaintenanceItem) =>
    item.name === filteredMaintenanceItem?.name ? filteredMaintenanceItem : item
  );
  const { error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error("Error Adding new maintenance", error.message);
  } else {
    revalidatePath("/cars/" + carId);
  }
}

export async function deleteLastMaintenance(name: string, carId: string) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("*")
    .eq("carId", carId)
    .select("Maintenance");
  const MaintenanceItems: MaintenanceItem[] =
    Maintenance?.at(0)?.Maintenance ?? [];

  const filteredMaintenanceItem = MaintenanceItems.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item: MaintenanceItem) => item.name === name
  ).at(0);
  // remove the last item from the historyLog array
  if (filteredMaintenanceItem?.historyLog.length === 0)
    throw new Error("No Maintenance History to delete");
  filteredMaintenanceItem?.historyLog.pop();
  const finalData = MaintenanceItems.map((item: MaintenanceItem) =>
    item.name === filteredMaintenanceItem?.name
      ? {
          ...filteredMaintenanceItem,
          historyLog: [...filteredMaintenanceItem.historyLog],
        }
      : item
  );

  const { data, error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error("Error deleting last maintenance", error.message);
    throw new Error("Error deleting last maintenance");
  } else {
    revalidatePath("/cars/" + data.at(0).carId);
  }
}

export async function editLastMaintenance(
  carId: string,
  newMaintenance: {
    name: string;
    date: string;
    brand: string;
    price: string;
    kilometrageBeforeMaintenance: number;
    kilometrageNextMaintenance: number;
  }
) {
  await deleteLastMaintenance(newMaintenance.name, carId);
  await addNewMaintenance({ newMaintenance, carId });
  revalidatePath("/cars/" + carId);
}

export async function updateChangeEvery(
  name: string,
  carId: string,
  newChangeEveryValue: number
) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("*")
    .eq("carId", carId)
    .select("Maintenance");

  const MaintenanceItems: MaintenanceItem[] =
    Maintenance?.at(0)?.Maintenance ?? [];

  const filteredMaintenanceItem = MaintenanceItems.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item: MaintenanceItem) => item.name === name
  ).at(0);
  //update the changeEvery value of the filteredMaintenanceItem
  const finalData = MaintenanceItems.map((item: MaintenanceItem) =>
    item.name === filteredMaintenanceItem?.name
      ? {
          ...filteredMaintenanceItem,
          changeEvery: newChangeEveryValue,
        }
      : item
  );
  const { data, error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error(
      `Error updating changeEvery value for ${name} maintenance`,
      error.message
    );
    throw new Error(`Error updating changeEvery value for ${name} maintenance`);
  } else {
    revalidatePath("/cars/" + data.at(0).carId);
  }
}

export async function updateKiloMetrage(newKilometrage: number, carId: string) {
  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("cars")
    .update({
      currentKilometrage: newKilometrage,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    throw new Error("Error updating new kilometrage");
  } else {
    revalidatePath("/cars/" + carId);
  }
}
export async function getLatestMaintenance(
  carId: string,
  maintenanceName: string
) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("Maintenance")
    .eq("carId", carId);

  const MaintenanceItems: MaintenanceItem[] =
    Maintenance?.at(0)?.Maintenance ?? [];

  const filteredMaintenanceItem = MaintenanceItems.filter(
    (item: MaintenanceItem) => item.name === maintenanceName
  ).at(0);

  if (
    !filteredMaintenanceItem ||
    filteredMaintenanceItem.historyLog.length === 0
  )
    return null;

  const latestMaintenance = filteredMaintenanceItem?.historyLog?.at(-1);

  return latestMaintenance;
}
