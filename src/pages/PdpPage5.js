import Pdp_XAL from "../components/pdp_XAL";

export default function PdpPage2() {
  const data = [{

    "XAL-53": {
    imgMain:
      "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Fire-P1909008-primaryimage",
    img1: "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Fire-P1909008-primaryimage",
    title: "Manual Call Points/Pull Station",
    headertext: `KILLARK® XAL-53 Explosion-Proof Pull Station
        KILLARK® XAL-53 explosion-proof pull stations are suitable for use in hazardous areas due to the presence of flammable gases or vapors, combustible dust, or easily ignitable fibers.
        `,
    overview:
      "KILLARK® XAL-53 explosion-proof pull stations are suitable for use in hazardous areas due to the presence of flammable gases or vapors, combustible dust, or easily ignitable fibers. Typical applications for this product include petroleum refineries, chemical and petrochemical plants, storage areas, and other processing facilities where hazardous substances are handled and stored.",
  
    "features": [
      {
        "p1": "Enclosure is made of copper-free aluminum alloy",
        "p2": "Enclosure is made of copper-free aluminum alloy",
        "p3": "Red, textured powder epoxy paint finish is standard on box and cover and provides high visibility for alarm station",
        "p4": "Universal normally open (one) and normally closed (one) contact furnished standard",
        "p5": "Bilingual nameplates included per CSA requirement",
        "p6": "Internal ground screw is standard",
        "p7": "Wiring range is 24 through 12 AWG, solid or stranded",
     }],
     "Certifications":[
        {
            "p1": "UL Listed: E50498",
        "p2": "ULC Listed: E50498",
        "p3": "CSA: LR31085",
        "p4": "CSFM: 7150-1439:100"
        }
     ],
     "SKUS":[
        {
            "Part Number": "XAL-53",
            "Description": "Hazardous Location Pull Station, NO and NC Contacts"
        }
     ]
    },


  }
    
   


]; 

  return (
    <>
      <Pdp_XAL/>
    </>
  );
}
