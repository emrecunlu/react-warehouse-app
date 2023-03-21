export interface IPersonal {
	id: number;
	staffCode: string;
	firstName: string;
	lastName: string;
}

export interface IResponse<T> {
	statusCode: number;
	message: string | null;
	isSuccessfull: boolean;
	data: T;
}

export interface IKirmaSeri {
	uretilecekKirma: string;
	createdSk: string;
	stockId: number;
	seriNo: string;
	isemriNo: string;
	stokKodu: string;
	yapKod: string;
	kg: number;
	adet: number;
	gramaj: number;
	harcananKg?: number;
}

export interface IKirmaSeriBody {
	seriNo: string;
}

export interface IKirmaBody {
	stokKodu: string;
	stokAdi: string;
	kg: number;
	teraziMiktari: number;
	harcananSeriler: IHarcananSeriler[];
}

export interface IHarcananSeriler {
	seriNo: string;
	kg: number;
	adet: number;
	gramaj: number;
}
