import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongooDB";
import { InventoryCategoryModel} from "@/models/inventoryCategoryModel";
export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const {alternativeName,
      form,itemCategory,
      itemName,
      presetQuantity,
      price,
      productDescription,
      unitOfMeasure} = body;   
        let newCategory = await InventoryCategoryModel.create({
          alternativeName,
          form,itemCategory,
          itemName,
          presetQuantity,
          price,
          productDescription,
          unitOfMeasure
        });
    
        return NextResponse.json({
          message: "Add New Product",
          status: true,
          data: newCategory,
        });
  } catch (error) {
    return NextResponse.json({
        message: "Error occured in adding new Product",
        status: false,
      });
  }
}
