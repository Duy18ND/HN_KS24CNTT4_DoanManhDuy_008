import React, { useState } from 'react'
import '../index.css'
import { Button } from 'antd'
import { Pencil, Save, Trash } from 'lucide-react'
type Movie = {
    id: number | string,
    name: string,
    date: Date
}

export default function HN_KS24CNTT4_DoanManhDuy_008() {
    const [movie, setMovie] = useState("");
    const [movies, setMovies] = useState<Movie[]>(() => {
        const movieLocation = localStorage.getItem("movie");
        return movieLocation ? JSON.parse(movieLocation) : []
    });
    const [error, setError] = useState("");

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovie(e.target.value);
        if (!e.target.value.trim()) {
            setError("Tên công việc không được để trống!");
        } else {
            setError("");
        }
    }
    // Submit form

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!movie.trim()) {
            setError("Tên công việc không được để trống!");
            return;
        }

        const newTask: Movie = {
            id: Math.floor(Math.random() * 9999999),
            name: movie,
            date: new Date()
        };



        const movieClones = [...movies, newTask];
        setMovies(movieClones);
        localStorage.setItem("movie", JSON.stringify(movieClones));
        setMovie("");


    }
    const handleToogeEdit = () => {

    }
    return (
        <>
            <div className="h-[100vh] bg-linear-to-t from-[#677BE5] to-indigo-500 ">
                <div className='p-4 pl-20 pr-20'>
                    <header className='flex flex-col justify-center items-center gap-3 mb-5'>
                        <h1 className='text-4xl font-semibold text-amber-50'>Quản lý phim chiếu</h1>
                        <p className='text-amber-50'>Thêm, sửa và quản lý các bộ phim chuẩn bị được chiếu</p>
                    </header>

                    {/* Search */}
                    <nav className='rounded-[8px] bg-[#f7f8fd] '>
                        <div className='p-4 pt-10 pb-10 flex flex-col gap-3'>
                            <div>Tên phim:</div>
                            <form className='flex gap-3' onClick={handleSubmit}>
                                <input type="text" placeholder='Nhập tên phim chuẩn bị chiếu...' className='w-[100%] border-1 rounded-[4px] outline-none' onChange={handleChangeInput} value={movie} />
                                <Button type='primary'>Thêm phim</Button>
                            </form>

                            <p className='text-red-600'>{error}</p>
                        </div>
                    </nav>
                    {/* Quản lý phim */}
                    <main className='flex flex-col gap-[20px] mt-[20px]'>
                        <div className='rounded-[7px] bg-[#677be5] p-5'>
                            <div className='text-center p-4'>
                                <h3 className='text-3xl font-medium text-amber-50'>Danh sách phim</h3>
                                <p className='text-amber-50'>4 phim</p>
                            </div>
                        </div>

                        <ul className='flex gap-[20px] flex-wrap'>
                            {/* thêm ở đây */}
                            {movies.map((item) => (
                                <li className='flex flex-col gap-3 bg-[#ffffff] w-[32.3%] h-[200px] justify-center border-t-6 border-t-[#7664c0] rounded-[8px]' key={item.id}>
                                    <div className='p-4'>
                                        <h3 className='text-[20px] font-medium'>{item.name}</h3>
                                        <p className='text-[#959595] mb-5'>{item.date.toLocaleString()}</p>
                                        <div className='flex gap-2.5 justify-end'>
                                            <button onClick={() => handleToogeEdit(item.id)} className='bg-[#fc9000] text-amber-50 font-medium hover:bg-[#dd7f03] transition-colors flex gap-1.5 p-2 rounded-[4px]'><Pencil /> <p>Sửa</p></button>
                                            <button onClick={() => handleToogeDelete(item.id)} className='bg-[#ec3f35] text-amber-50 font-medium hover:bg-[#d80e04] transition-colors flex gap-1.5 p-2 rounded-[4px]'><Trash /> <p>Xóa</p></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Sua phim */}
                        <div className='flex flex-col w-[500px] h-[250px] rounded-[12px] bg-[#ffffff] fixed '>
                            <div className='p-5'>
                                <h3 className='text-2xl'>Chỉnh sửa phim</h3>
                                <div className='flex gap-1 mt-5 mb-5'>
                                    <label htmlFor="">Tên phim:</label>
                                    <input onChange={handleChangeEdit} type="text" value={movie} className='border-1 outline-none w-[80%] rounded-[4px]' />
                                </div>
                                <div className='flex justify-end gap-5'>
                                    <button className='bg-[#f5f5f5] font-medium hover:bg-[#e4e4e4] transition-colors flex gap-1.5 p-2 rounded-[4px] border-1'><p>Hủy</p></button>
                                    <button className='bg-[#49aa4d] text-amber-50 font-medium hover:bg-[#319e34] transition-colors flex gap-1.5 p-2 rounded-[4px] border-1'><Save /> <p>Lưu</p></button>
                                </div>
                            </div>
                        </div>
                        {/* Xóa phim */}
                        <div className='flex flex-col w-[500px] h-[250px] rounded-[12px] bg-[#ffffff] '>
                            <div className='p-5'>
                                <div className='text-2xl flex gap-4 text-center items-center justify-center'><Trash /> <h3 className='font-medium'>Xóa Phim</h3></div>
                                <div className='flex gap-1 mt-5 mb-5'>Bạn có chắc xóa <h3 className='font-bold'>Mưa đỏ</h3> phim này không?</div>
                                <div className='flex justify-end gap-5'>
                                    <button className='bg-[#f5f5f5] font-medium hover:bg-[#e4e4e4] transition-colors flex gap-1.5 p-2 rounded-[4px] border-1'><p>Hủy</p></button>
                                    <button className='bg-[#ec3f35] text-amber-50 font-medium hover:bg-[#d80e04] transition-colors flex gap-1.5 p-2 rounded-[4px]'><Trash /> <p>Xóa</p></button>
                                </div>
                            </div>
                        </div>
                        {movies.length === 0 ? (
                            <div className='text-center'>
                                <h3 className='text-3xl text-amber-50 mb-4'>Chưa có phim nào</h3>
                                <p className='text-amber-50'>hãy thêm phim đầu tiên để bắt đầu quản lý</p>
                            </div>
                        ) : ""}

                    </main>
                </div>
            </div>
        </>
    )
}
