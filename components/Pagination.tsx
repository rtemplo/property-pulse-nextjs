import Link from 'next/link';
import { FaStepForward, FaStepBackward, FaFastForward, FaFastBackward } from 'react-icons/fa';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <>
          <Link
            href={`/properties?page=${1}&pageSize=${pageSize}`}
            className="mr-2 p-2 border border-gray-300 rounded flex align-center"
          >
            <FaFastBackward className="inline-block mr-1" />
          </Link>
          <Link
            href={`/properties?page=${page - 1}&pageSize=${pageSize}`}
            className="mr-2 p-2 border border-gray-300 rounded flex align-center"
          >
            <FaStepBackward className="inline-block mr-1" />
          </Link>
        </>
      )}
      <span>
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <>
          <Link
            href={`/properties?page=${page + 1}&pageSize=${pageSize}`}
            className="ml-2 p-2 border border-gray-300 rounded flex align-center"
          >
            <FaStepForward className="inline-block ml-1" />
          </Link>
          <Link
            href={`/properties?page=${totalPages}&pageSize=${pageSize}`}
            className="ml-2 p-2 border border-gray-300 rounded flex align-center"
          >
            <FaFastForward className="inline-block ml-1" />
          </Link>
        </>
      )}
    </section>
  );
};

export default Pagination;
