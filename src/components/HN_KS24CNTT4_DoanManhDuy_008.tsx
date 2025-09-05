import React, { useState } from "react";
import "../index.css";
import { Button } from "antd";
import { Pencil, Save, Trash, X } from "lucide-react";

type Movie = {
  id: number | string;
  name: string;
  date: string;
};

export default function HN_KS24CNTT4_DoanManhDuy_008() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState<Movie[]>(() => {
    const movieLocation = localStorage.getItem("movie");
    return movieLocation ? JSON.parse(movieLocation) : [];
  });
  const [error, setError] = useState("");

  // State cho Edit
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [editName, setEditName] = useState("");

  // State cho Delete
  const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

  // Input change
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(e.target.value);
    if (!e.target.value.trim()) {
      setError("Tên phim không được để trống!");
    } else {
      setError("");
    }
  };

  // Submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!movie.trim()) {
      setError("Tên phim không được để trống!");
      return;
    }

    const newTask: Movie = {
      id: Math.floor(Math.random() * 9999999),
      name: movie,
      date: new Date().toLocaleString(),
    };

    const movieClones = [...movies, newTask];
    setMovies(movieClones);
    localStorage.setItem("movie", JSON.stringify(movieClones));
    setMovie("");
  };

  // Toggle Edit
  const handleToggleEdit = (item: Movie) => {
    setEditingMovie(item);
    setEditName(item.name);
  };

  // Save Edit
  const handleSaveEdit = () => {
    if (!editName.trim()) return;

    const updatedMovies = movies.map((m) =>
      m.id === editingMovie?.id ? { ...m, name: editName } : m
    );

    setMovies(updatedMovies);
    localStorage.setItem("movie", JSON.stringify(updatedMovies));

    setEditingMovie(null);
    setEditName("");
  };

  // Toggle Delete
  const handleToggleDelete = (item: Movie) => {
    setDeletingMovie(item);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingMovie) return;

    const updatedMovies = movies.filter((m) => m.id !== deletingMovie.id);

    setMovies(updatedMovies);
    localStorage.setItem("movie", JSON.stringify(updatedMovies));

    setDeletingMovie(null);
  };

  return (
    <>
      <div className="h-[100vh] bg-gradient-to-t from-[#677BE5] to-indigo-500">
        <div className="p-4 pl-20 pr-20">
          <header className="flex flex-col justify-center items-center gap-3 mb-5">
            <h1 className="text-4xl font-semibold text-amber-50">
              Quản lý phim chiếu
            </h1>
            <p className="text-amber-50">
              Thêm, sửa và quản lý các bộ phim chuẩn bị được chiếu
            </p>
          </header>

          {/* Search */}
          <nav className="rounded-[8px] bg-[#f7f8fd] ">
            <div className="p-4 pt-10 pb-10 flex flex-col gap-3">
              <div>Tên phim:</div>
              <form className="flex gap-3 w-full" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nhập tên phim chuẩn bị chiếu..."
                  className="w-full border rounded-[4px] outline-none"
                  onChange={handleChangeInput}
                  value={movie}
                />
                <Button type="primary" htmlType="submit">
                  Thêm phim
                </Button>
              </form>

              <p className="text-red-600">{error}</p>
            </div>
          </nav>

          {/* Quản lý phim */}
          <main className="flex flex-col gap-[20px] mt-[20px]">
            <div className="rounded-[7px] bg-[#677be5] p-5">
              <div className="text-center p-4">
                <h3 className="text-3xl font-medium text-amber-50">
                  Danh sách phim
                </h3>
                <p className="text-amber-50">{movies.length} phim</p>
              </div>
            </div>

            <ul className="flex gap-[20px] flex-wrap">
              {movies.map((item) => (
                <li
                  className="flex flex-col gap-3 bg-[#ffffff] w-[32.3%] h-[200px] justify-center border-t-4 border-t-[#7664c0] rounded-[8px]"
                  key={item.id}
                >
                  <div className="p-4">
                    <h3 className="text-[20px] font-medium">{item.name}</h3>
                    <p className="text-[#959595] mb-5">{item.date}</p>
                    <div className="flex gap-2.5 justify-end">
                      <button
                        onClick={() => handleToggleEdit(item)}
                        className="bg-[#fc9000] text-amber-50 font-medium hover:bg-[#dd7f03] transition-colors flex gap-1.5 p-2 rounded-[4px]"
                      >
                        <Pencil /> <p>Sửa</p>
                      </button>
                      <button
                        onClick={() => handleToggleDelete(item)}
                        className="bg-[#ec3f35] text-amber-50 font-medium hover:bg-[#d80e04] transition-colors flex gap-1.5 p-2 rounded-[4px]"
                      >
                        <Trash /> <p>Xóa</p>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {movies.length === 0 && (
              <div className="text-center">
                <h3 className="text-3xl text-amber-50 mb-4">
                  Chưa có phim nào
                </h3>
                <p className="text-amber-50">
                  hãy thêm phim đầu tiên để bắt đầu quản lý
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Overlay Edit */}
      {editingMovie && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="flex flex-col w-[500px] rounded-[12px] bg-[#ffffff]">
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl">Chỉnh sửa phim</h3>
                <button onClick={() => setEditingMovie(null)}>
                  <X />
                </button>
              </div>
              <div className="flex gap-2 mt-5 mb-5 items-center">
                <label>Tên phim:</label>
                <input
                  onChange={(e) => setEditName(e.target.value)}
                  type="text"
                  value={editName}
                  className="border outline-none w-[80%] rounded-[4px] p-1"
                />
              </div>
              <div className="flex justify-end gap-5">
                <button
                  onClick={() => setEditingMovie(null)}
                  className="bg-[#f5f5f5] font-medium hover:bg-[#e4e4e4] transition-colors flex gap-1.5 p-2 rounded-[4px] border"
                >
                  <p>Hủy</p>
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-[#49aa4d] text-amber-50 font-medium hover:bg-[#319e34] transition-colors flex gap-1.5 p-2 rounded-[4px] border"
                >
                  <Save /> <p>Lưu</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Delete */}
      {deletingMovie && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="flex flex-col w-[500px] rounded-[12px] bg-[#ffffff]">
            <div className="p-5">
              <div className="text-2xl flex gap-4 text-center items-center justify-center">
                <Trash /> <h3 className="font-medium">Xóa Phim</h3>
              </div>
              <div className="flex gap-1 mt-5 mb-5 justify-center">
                Bạn có chắc xóa{" "}
                <h3 className="font-bold">{deletingMovie.name}</h3> phim này
                không?
              </div>
              <div className="flex justify-end gap-5">
                <button
                  onClick={() => setDeletingMovie(null)}
                  className="bg-[#f5f5f5] font-medium hover:bg-[#e4e4e4] transition-colors flex gap-1.5 p-2 rounded-[4px] border"
                >
                  <p>Hủy</p>
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-[#ec3f35] text-amber-50 font-medium hover:bg-[#d80e04] transition-colors flex gap-1.5 p-2 rounded-[4px]"
                >
                  <Trash /> <p>Xóa</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
