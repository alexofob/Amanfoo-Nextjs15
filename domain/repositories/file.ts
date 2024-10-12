export type Results = {
  message: string;
};

export interface FileRepository {
  removeImageFromCDN(imageUrl: string): Promise<void>;
}
