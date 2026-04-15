import assets from "../assets/assets";

function Punjab() {
  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col gap-6 md:gap-10 items-center mt-6 px-4 md:px-[5%]">
        <div className="bg-green-100 rounded-full shadow-xl w-full text-center px-4">
          <h1 className="py-2 font-bold text-2xl md:text-[40px]">Punjab</h1>
        </div>

        <img className="w-full max-w-lg h-48 md:h-[300px] object-cover rounded-3xl" src={assets.punjab} />

        <p className="w-full md:w-[60%] text-gray-600 text-center md:text-left">
          Punjab, the land of five rivers, is a state rich in history, spirituality, and vibrant culture. Here are five
          of the top spots for travelers:
        </p>

        <hr className="w-full md:w-[80%] border-green-200 border-2" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-10 py-8 px-4 md:px-12">
        {/* Amritsar*/}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/2 rounded-lg" src={assets.punjabAmritsar} />
          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Amritsar:</span> The spiritual heart of Punjab, Amritsar is a must-visit
              destination. The centerpiece is the Golden Temple (Sri Harmandir Sahib), the holiest shrine of Sikhism,
              which is a serene and awe-inspiring sight. Other key attractions include the historic Jallianwala Bagh, a
              memorial to the victims of a tragic massacre, and the electrifying Wagah Border ceremony, a daily military
              parade that marks the closing of the India-Pakistan border.
            </p>
          </div>
        </div>

        {/* Chandigarh */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Chandigarh:</span> The capital of both Punjab and Haryana, Chandigarh is a
              modern, well-planned city. It's an architectural marvel designed by the renowned French architect Le
              Corbusier. Top spots include the unique Rock Garden, an art installation created from industrial and urban
              waste, the peaceful Sukhna Lake, and the Open Hand Monument, the city's official emblem of peace and
              prosperity.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.punjabChandigarh} />
        </div>

        {/* Anandpur Sahib */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.punjabAnandpurSahib} />
            <img className="rounded-3xl" src={assets.punjabAnandpurSahib1} />
          </div>

          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Anandpur Sahib:</span> This city holds immense religious significance for
              Sikhs and is home to the second-holiest Sikh shrine, after the Golden Temple. It's the birthplace of the
              Khalsa, the collective body of initiated Sikhs. The Takht Sri Keshgarh Sahib is a major pilgrimage site,
              and the city is a hub of Sikh history and culture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Punjab;
