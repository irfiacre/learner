"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Pagination from "./Pagination";
import Link from "next/link";
import { formatDate, formatPrice } from "@/util/helpers";
import ConfirmModel from "../models/ConfirmModel";

const EventsTable = ({
  data,
  loading,
  deleteEvent,
}: {
  data: Array<any>;
  loading: boolean;
  deleteEvent: (id: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  useEffect(() => {
    updateTableData(
      data.filter((item) =>
        searchText.trim() === ""
          ? item
          : item.title.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  }, [data, searchText]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleConfirmDelete = () => {
    deleteEvent(eventToDelete?.id!);
    setEventToDelete(null);
  };

  const handleDeleteButtonClicked = (eventId: string) =>
    setEventToDelete(eventId);

  return (
    <BaseCard className="px-10 py-5">
      {eventToDelete && (
        <ConfirmModel
          title={`Are you sure you want to delete "${eventToDelete.title}"`}
          message="This action is irreversible and permanent"
          loading={loading}
          handleConfirmed={handleConfirmDelete}
          handleClose={() => setEventToDelete(null)}
          // isDelete
        />
      )}
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSearch}
        inputClassName="rounded-xl"
      />

      <div className="py-5 text-textLightColor text-base font-semibold flex flex-row justify-between items-center">
        <span>Total = {data.length}</span>
        <div className="text-white bg-primary hover:bg-white hover:text-primary border border-primary focus:outline-none font-normal rounded-xl text-sm text-center p-4">
          <Link href="/events">Add an Event</Link>
        </div>
      </div>
      <div className="py-2.5 text-textLightColor text-base font- flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-backgroundColor">
        <span className="w-full">Title</span>
        <span className="w-full max-sm:hidden">Description</span>
        <span className="w-2/4 max-sm:hidden">Capacity</span>
        <span className="w-2/4 max-sm:hidden">Price</span>
        <span className="w-2/4">Location</span>
        <span className="w-2/4">Date</span>
      </div>
      <hr />
      {loading || !tableData[0] ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
          <span>{`${loading ? "Loading Data..." : "No Events Found"}`}</span>
        </div>
      ) : (
        <div>
          {tableData.map((item) => (
            <div key={item.id}>
              <div className="flex flex-row align-middle items-start py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
                <div className="text-sm w-full">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-medium">
                      {item.title}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-full max-sm:hidden">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-light">
                      {item.description.substring(0, 50)}
                    </span>
                  </Link>
                </div>

                <div className="text-sm w-2/4">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-light">
                      {formatPrice(item.capacity)}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-light">
                      {formatPrice(item.price)}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4 max-sm:hidden">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-light">
                      {item.location}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4">
                  <Link href={`/events/${item.id}`}>
                    <span className="text-textLightColor font-light">
                      {formatDate(item.date)}
                    </span>
                  </Link>
                </div>
                {/* <div className="w-2/4">
                  <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-primary hover:text-white focus:outline-none">
                    <Link href={`/events/edit/${item.id}`}>
                      <Icon icon="tabler:edit" fontSize={20} />
                    </Link>
                  </div>
                  <button
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                    type="button"
                    onClick={() => handleDeleteButtonClicked(item)}
                  >
                    <Icon icon="mdi:delete" fontSize={20} />
                  </button>
                </div> */}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={3} totalPages={1} />
      </div>
    </BaseCard>
  );
};

export default EventsTable;
