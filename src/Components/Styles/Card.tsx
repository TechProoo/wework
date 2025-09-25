import { Star } from "lucide-react"; // for star icon
import Dig from "../../assets/dd.webp";
export default function CourseCard() {
  return (
    <div className="card_cover cursor-pointer rounded-2xl overflow-hidden">
      <div className="relative p-2">
        <div className="card_img">
          <img src={Dig} alt="Course" className=" object-cover rounded-xl" />
        </div>
        <span className="card_tag  absolute top-4 left-4 text-xs font-semibold px-2 py-1 rounded">
          BEST SELLER
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
          Digital Marketing &amp; with Basics to advanced
        </h2>
        <p className="text-xs card_owner text-gray-500 mt-4">Clifford Lampe</p>

        {/* Rating */}
        <div className="flex items-center mt-4">
          <span className="text-sm font-semibold text-gray-800 mr-1">5.0</span>
          <div className="flex items-center text-[#3c4d42]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(234,89)</span>
        </div>

        {/* Price */}
        <div className="flex items-center mt-3">
          <span className="text-lg font-bold text-gray-800">$19.60</span>
          <span className="text-sm text-gray-400 line-through ml-2">
            $25.37
          </span>
        </div>
      </div>
    </div>
  );
}
