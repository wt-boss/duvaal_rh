import Breadcrumb from '../../components/Breadcrumb';
import fireToast from '../../hooks/fireToast';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AddSanction = () => {
  const navigate = useNavigate();

  const [sanction, setSanction] = useState({
    matricule: '',
    date: '',
    type: '',
    motif: '',
  });

  const handleChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSanction((prevState) => ({ ...prevState, [name]: value }));
  };

  const CreateSanction = async (event, matricule, motif, type, date) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/sanction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          matricule,
          motif,
          type,
          date,
        }),
      });

      if (!response.ok) {
        alert("echec de l'ajout de la sanction");

        throw new Error("Échec de l'ajout");
      }

      console.log('ok');
      alert("Sanction Ajoutée") ;
      navigate('/add/sanction');
      setSanction({ matricule: '',
      date: '',
      type: '',
      motif: '',
    })
    } catch (error) {
      console.error(error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="mx-auto">
        <Breadcrumb pageName="Ajouter une sanction" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Sanctionner un Employer
                </h3>
              </div>
              <div className="p-7">
                <form
                  onSubmit={(e) =>
                    CreateSanction(
                      e,
                      sanction.matricule,
                      sanction.motif,
                      sanction.type,
                      sanction.date,
                    )
                  }

                  onReset={()=>(setSanction({
                    matricule: '',
                    date: '',
                    type: '',
                    motif: '',
                  }))}
                >
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="year"
                      >
                        Matricule
                      </label>

                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="matricule"
                        onChange={(e) => handleChangeInput(e)}
                        value={sanction.matricule}
                        placeholder="Entrer le matricule de l'emplyé "
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="street"
                      >
                        Type
                      </label>

                      <div className="mb-3 block text-sm font-medium text-black dark:text-white">
                        <select
                          name="type"
                          onChange={(e) => handleChangeInput(e)}
                          value={sanction.type}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        >
                          <option value="Disciplinaire">Disciplinaire</option>
                          <option value="Ethique">Ethique</option>
                          <option value="Autres">Autres</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="region"
                      >
                        Motif
                      </label>

                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="motif"
                        onChange={(e) => handleChangeInput(e)}
                        value={sanction.motif}
                        placeholder="total quantity "
                      />
                    </div>

                    <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="street"
                      >
                        Date de sanction
                      </label>
                      <input
                        type="date"
                        name="date"
                        onChange={(e) => handleChangeInput(e)}
                        value={sanction.date}
                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                    >
                      Annuler
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                      onClick={fireToast}
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSanction;
